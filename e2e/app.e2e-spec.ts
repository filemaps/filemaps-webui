import { FilemapsWebuiPage } from './app.po';

describe('filemaps-webui App', () => {
  let page: FilemapsWebuiPage;

  beforeEach(() => {
    page = new FilemapsWebuiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
