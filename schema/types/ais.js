export const CommandLogUser = objectType({
  name: 'CommandLogUser',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('picture')
    t.nullable.list.field('roles', { type: 'Role' })
  }
})
