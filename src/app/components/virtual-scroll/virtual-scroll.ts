export interface VirtualScrollConfig {
  containerHight: number;
  rowHeight: number;
  nodePadding: number;
  generateItem?: (index: number) => any;
}

export interface VirtualScroll extends VirtualScrollConfig {
  scrollTop?: number,
  numberOfRows: number;
}

