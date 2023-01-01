import mongoose, { Schema } from 'mongoose'

export const allowEmptyString = () => {
  mongoose.Schema.Types.String.checkRequired(v => v !== null)
}

export const schemaRequireAll = (schema: Schema) => {
  Object.entries(schema.paths).forEach(([k, _]) => {
    const attr = schema.path(k)
    if (attr.options.required === undefined) attr.required(true)
    if (attr.schema) schemaRequireAll(attr.schema)
  })
}

export const runValidatorsOnUpdate = (schema: Schema) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema.pre(['findOneAndUpdate'], function(this: any, next) {
    this.options.runValidators = true
    next()
  })
}
