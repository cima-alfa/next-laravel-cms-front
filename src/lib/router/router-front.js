const Ziggy = {"url":"http:\/\/localhost:3000","port":3000,"defaults":{},"routes":{"front.set.cookies":{"uri":"api\/set-cookies","methods":["POST"]},"front.cp.dashboard.index":{"uri":"control-panel\/dashboard","methods":["GET","HEAD"]},"front.cp.pages.index":{"uri":"control-panel\/pages\/pages","methods":["GET","HEAD"]},"front.cp.pages.create":{"uri":"control-panel\/pages\/pages\/create","methods":["GET","HEAD"]},"front.cp.pages.edit":{"uri":"control-panel\/pages\/pages\/{pageId}","methods":["GET","HEAD"],"wheres":{"pageId":"[\\da-fA-F]{8}-[\\da-fA-F]{4}-[\\da-fA-F]{4}-[\\da-fA-F]{4}-[\\da-fA-F]{12}"},"parameters":["pageId"]},"front.cp.settings.index":{"uri":"control-panel\/settings","methods":["GET","HEAD"]},"front.login":{"uri":"login","methods":["GET","HEAD"]},"front.register":{"uri":"register","methods":["GET","HEAD"]},"front.page.permalink":{"uri":"{permalink?}","methods":["GET","HEAD"],"wheres":{"permalink":".+"},"parameters":["permalink"]},"verification.notice":{"uri":"email\/verify","methods":["GET","HEAD"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
