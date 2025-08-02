define(['knockout', 'text!components/helloWorld/helloWorld.html', 'css!components/helloWorld/helloWorld.css'], function (ko, template) {
  function HelloWorldViewModel(params) {
    var self = this

    self.msg = params.msg
    self.count = ko.observable(0)
  }

  return {
    viewModel: HelloWorldViewModel,
    template: template,
  }
})
