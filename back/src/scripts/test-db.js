import { prisma } from '../config/database.js'

async function main() {
  try {
    console.log('Conectando via adapter-pg...')

    const users = await prisma.user.findMany()

    console.log('Usuários no banco:', users)

  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

main()