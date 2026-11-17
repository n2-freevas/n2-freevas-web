/**
 * /calender の取得元が返す「埋まっている時間」。予定の名前・場所・メモなどは一切持たない。
 */
export type Busy = (
  /** 時刻のある予定(エポックミリ秒、end は含まない) */
  | { kind: "timed"; start: number; end: number }
  /** 終日の予定(日本時間の日付 "YYYY-MM-DD"、end は含まない) */
  | { kind: "allDay"; startDate: string; endDate: string }
) & {
  /** どこから来た予定か(帯のアイコンを決めるのに使う)。省略時は "other" */
  origin?: Origin;
  /** 取得元での予定の ID(テニスベアのイベント ID など)。公開してよい予定にだけ付ける */
  ref?: string;
};

export type Origin = "google" | "tennisbear" | "other";

/** 取得する範囲(エポックミリ秒、end は含まない) */
export interface Range {
  start: number;
  end: number;
}

/** 取得元。新しい SNS などに対応するときは、これを実装して sources に足す */
export interface BusySource {
  /** ログ用の名前(公開しない) */
  name: string;
  origin: Origin;
  fetch(range: Range): Promise<Busy[]>;
}
