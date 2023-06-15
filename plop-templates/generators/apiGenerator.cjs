module.exports = {
  description: 'create an api file',
  prompts: [
    {
      type: 'input',
      name: 'apiName',
      message: 'please enter api name :',
      default: 'news'
    },
    {
      type: 'confirm',
      name: 'needMock',
      message: 'do you want to make a mock of this api ?',
      default: 'Y'
    }
  ],
  actions: (data) => {
    let actions = []
    actions.push({
      type: 'add',
      path: 'src/api/{{ apiName }}Api.ts',
      templateFile: 'plop-templates/templates/api.hbs'
    })
    if (data.needMock) {
      actions.push({
        type: 'add',
        path: 'src/mock/{{ apiName }}.ts',
        templateFile: 'plop-templates/templates/mockApi.hbs'
      },
      {
        type: 'modify',
        path: 'src/mock/index.ts',
        pattern: /(\/\/ import new mock)/gi,
        template: "import {{ apiName }} from './{{ apiName }}'\r\n$1"
      },
      {
        type: 'modify',
        path: 'src/mock/index.ts',
        pattern: /(\/\/ add mock into mocks)/gi,
        template: '...{{ apiName }},\r\n$1'
      })
    }
    return actions
  }
}