/**
 * arcade
 */
export interface Arcade {
  /**
   * 机厅地址
   */
  arcade_address: string;
  /**
   * 单局花销
   */
  arcade_cost: number | null;
  /**
   * 机台数量
   */
  arcade_count: number | null;
  /**
   * 机厅存活情况
   */
  arcade_dead: boolean;
  /**
   * 机厅ID
   */
  arcade_id: number;
  /**
   * 机厅纬度
   */
  arcade_lat: number;
  /**
   * 机厅经度
   */
  arcade_lng: number;
  /**
   * 机厅名
   */
  arcade_name: string;
  /**
   * 创建时间
   */
  created_at: Date;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [property: string]: any;
}

export enum SortMethod {
  Distance = 0,
  Pinyin = 1,
  Default = 2,
}
