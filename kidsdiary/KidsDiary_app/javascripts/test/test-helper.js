import { jsdom } from 'jsdom';

// refer: http://rackt.org/redux/docs/recipes/WritingTests.html 'Fix Broken setState()'
// setState()を実行するようなテストの前にこの関数を実行しておく
export function setDom() {
  global.document = jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}
