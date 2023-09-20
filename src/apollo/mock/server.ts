import { mockServer } from '@graphql-tools/mock'
import { buildSchema } from 'graphql'

const mocks = {
  posts: () => ({
    id: 1,
    name: 'lorem'
  })
}

export const typeDefs = `
  type Query {
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    body: String
  }
`

// export const resolvers = {
//   Query: {
//     posts: () => [
//       { id: '1', title: 'First Post', body: 'This is the first post' },
//       { id: '2', title: 'Second Post', body: 'This is the second post' }
//     ]
//   }
// }

const schema = buildSchema(typeDefs)
const preserveResolvers = false
const server = mockServer(schema, mocks, preserveResolvers)

export default server
