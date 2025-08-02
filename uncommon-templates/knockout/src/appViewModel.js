define(['knockout', 'components/helloWorld/helloWorld', 'i18n!nls/messages'], function (ko, HelloWorld, messages) {
  return function appViewModel() {
    var self = this

    self.messageText = messages

    ko.components.register('hello-world', HelloWorld)
  }
})
