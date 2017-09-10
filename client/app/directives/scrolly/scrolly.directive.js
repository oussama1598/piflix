export default () => ({
  restrict: 'A',
  scope: {
    scrolly: '&',
    scope: '='
  },
  link: (scope, element, attrs) => {
    const raw = element[0]
    const expressionHandler = scope.scrolly().bind(scope.scope)

    element.bind('scroll', function () {
      if ((raw.scrollTop + raw.offsetHeight + 1) >= raw.scrollHeight) { // at the bottom
        expressionHandler(raw.scrollTop, raw)
      }
    })
  }
})
