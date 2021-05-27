interface IPage {
  url: string;
  waitUntilPageLoads: () => Promise<boolean>;
}

export default IPage;
