<script lang="ts">
  import { onMount } from "svelte";
  import SEO from "#lib/component/seo/index.svelte";
  import CarrerCard from "./_components/CarrerCard.svelte";
  import { convertDateToFormatString } from "#lib/util/time.ts";
  import N2Clock from "#lib/component/N2Clock.svelte";

  export let data;

  const myname = "Taro Nonoyama"; //'Taro <span style="color:#ff0000">N</span>onoyama'
  const mySex = "Male";
  const myBloodType = "A Rh+";
  const myBirthDay = new Date("1996-09-30T00:26:29+09:00");
  let myAgeYear = 0;
  let myAgeDay = 0;
  let myAgeHour = 0;
  let myAgeMinutes = 0;
  let myAgeSecond = 0;
  let ticktockInterval = 1000;
  const myJob = ["Engineer", "Designer", "Artist"];
  const backgroundIllust = [""];
  const calcElapsedYear = (s: Date, e: Date) =>
    e.getFullYear() === s.getFullYear()
      ? 0
      : e.getFullYear() -
        s.getFullYear() -
        1 +
        (12 - s.getMonth() + (e.getMonth() + 1) >= 13 ? 1 : 0);
  onMount(async () => {
    myAgeYear = calcElapsedYear(myBirthDay, new Date());
    let ts = new Date().getTime() - myBirthDay.getTime();
    let milliesec = 1000;
    let sec = milliesec * 60;
    myAgeSecond = Math.floor((ts / milliesec) % 60);
    let minutes = sec * 60;
    myAgeMinutes = Math.floor((ts / sec) % 60);
    let hour = minutes * 24;
    myAgeHour = Math.floor((ts / minutes) % 24);
    myAgeDay = Math.floor((ts / hour) % 365);
    setInterval(ticktockMyAge, ticktockInterval);
  });

  async function ticktockMyAge() {
    myAgeSecond += 1;
    if (myAgeSecond >= 60) {
      myAgeSecond = 0;
      myAgeMinutes += 1;
    }
    if (myAgeMinutes >= 60) {
      myAgeMinutes = 0;
      myAgeHour += 1;
    }
    if (myAgeHour >= 24) {
      myAgeHour = 0;
      myAgeDay += 1;
    }
    if (myAgeDay >= 365) {
      myAgeYear += 1;
    }
  }
</script>

<SEO title="Introduce" />

<section>
  <h1>{@html myname}</h1>
  <ul>
    <li>{myJob.join(", ")}</li>
    <li class="birthday">
      {`Age ${myAgeYear}`}
      <div class="birthday-count">
        {`( ${myAgeDay}day ${myAgeHour}hour ${myAgeMinutes}minutes ${myAgeSecond}seconds)`}
      </div>
    </li>
    <li>{mySex}</li>
    <li>{myBloodType}</li>
  </ul>
</section>

<section class="carrers">
  {#each data.careers as cd}
    <div class="carrer">
      <div class="carrer_duration">
        {#if cd.endAt}
          <div>
            {convertDateToFormatString(cd.endAt)}
          </div>
          <div style="text-align: center">-</div>
        {/if}
        <div>
          {convertDateToFormatString(cd.startAt)}
        </div>
      </div>
      <div class="marker">
        <div role="presentation" class="dot"></div>
        <div role="presentation" class="connector"></div>
      </div>
      <CarrerCard props={cd} ogp={data.ogp} />
    </div>
  {/each}
</section>

<N2Clock position="introduce" />

<div style="padding: 50px 0" />

<style lang="scss">
  // basic info box
  section {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
  }
  h1 {
    margin: 30px 0;
  }
  .birthday {
    .birthday-count {
      display: inline;
      font-size: 13px;
    }
  }

  // carrer box

  .carrers {
    --carrer_box_gap: 100px;
    display: flex;
    flex-direction: column;
    gap: var(--carrer_box_gap);
  }
  .carrer {
    position: relative;
    height: 100%;

    .carrer_duration {
      position: absolute;
      top: -2px;
      left: -100px;
      font-size: 13px;

      @media (max-width: 720px) {
        position: relative;
        display: flex;
        gap: 10px;
        width: 150px;
        top: -5px;
        left: -25px;
      }
    }

    .marker {
      --marker-gap: 15px;
      position: absolute;
      left: -25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--marker-gap);
      height: calc(100% + var(--carrer_box_gap) - var(--marker-gap));
      @media (max-width: 720px) {
        height: calc(100% + var(--carrer_box_gap) - 40px);
      }
      .dot {
        --dot-size: 16px;
        position: relative;
        width: var(--dot-size);
        height: var(--dot-size);
        border-radius: calc(var(--dot-size) / 2);
        border: solid 1px white;

        &::before {
          content: "";
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          bottom: 0;
          right: 0;
          border-radius: 50%;
          border: solid 1px white;
          transition: 0.2s;
        }
      }
      .connector {
        width: 1px;
        height: 100%;
        background: white;
      }
    }

    &:hover {
      .marker {
        .dot {
          &::before {
            opacity: 1;
            bottom: -5px;
            right: -5px;
            width: 200%;
            height: 200%;
          }
        }
      }
    }
  }
</style>
