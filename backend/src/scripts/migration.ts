import { execSync } from 'child_process'

const arg = process.argv[2] || ''

execSync(`typeorm migration:create src/database/migrations/${arg}`, { stdio: [0, 1, 2] })
