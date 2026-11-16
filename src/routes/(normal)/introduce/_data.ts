export interface CarrearCardProps {
  name: string;
  url: string;
  startAt: Date;
  endAt?: Date;
  reffers: {
    name?: string;
    url: string;
  }[];
}

export const CARRER_CARD_DATA: CarrearCardProps[] = [
  {
    name: "dwango",
    url: "https://dwango.co.jp/",
    startAt: new Date("2025-08-01T10:00:00"),
    endAt: undefined,
    reffers: [
      {
        name: "出向中：PUBLUS",
        url: "https://publus.jp/",
      },
    ],
  },
  {
    name: "kurashiru",
    url: "https://kurashiru.co.jp/",
    startAt: new Date("2023-06-01T10:00:00"),
    endAt: new Date("2025-06-30T17:23:17"),
    reffers: [
      {
        url: "https://chot-inc.com/service/case/kurashiru-hikaku",
      },
    ],
  },
  {
    name: "ACCESS Co., Ltd.",
    url: "https://www.access-company.com/",
    startAt: new Date("2021-04-01T10:00:00"),
    endAt: new Date("2023-05-31T18:23:00"),
    reffers: [
      {
        url: "https://prtimes.jp/main/html/rd/p/000000256.000022823.html",
      },
    ],
  },
  {
    name: "Meijo Univ",
    url: "https://www.meijo-u.ac.jp/academics/info_eng/",
    startAt: new Date("2015-04-01T09:00:00"),
    endAt: new Date("2021-03-08T11:00:00"),
    reffers: [],
  },
];
