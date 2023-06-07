module.exports = {
  description: 'create a store file',
  prompts: [{
    type: 'input',
    name: 'storeName',
    message: 'please input store name :'
  }],
  actions: [{
    type: 'add',
    path: 'src/store/{{ storeName }}.ts',
    templateFile: 'plop-templates/templates/store.hbs'
  }]
}