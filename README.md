# README for AdonisJS v6 User Authentication and Roles Project

Welcome to the AdonisJS v6 User Authentication and Roles project! This project is designed to help you set up user authentication and role management using AdonisJS v6.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**

```bash
$ git clone [repository URL]
```

1. **Navigate to the project directory:**

```bash
$ cd adonisBombero
```

1. **Install dependencies:**

```bash
$ npm install
```

1. **Set up the project:**

```bash
$ npm init adonisjs@latest adonisBombero -- --db=mysql
```

1. **Run the development server:**

```bash
$ npm run dev
```

## Usage

Follow these steps to set up and use the authentication and roles features:

- **Create the Role model and its migration:**

```tsx
$ node ace make:model Role
$ node ace make:migration Role
```

- **Edit the create_roles_table migration file:**

```tsx
async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.string('name');
        table.string('description');
        table.timestamp('created_at')
        table.timestamp('updated_at')
    })
}
async down() {
    this.schema.dropTable(this.tableName)
}
```

- **Create a migration for the pivot table role_user:**

```tsx
$ node ace make:migration role_user
```

- **Edit the create_role_user_table migration file:**

```tsx
async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('user_id').unsigned().references('users.id')
        table.integer('role_id').unsigned().references('roles.id')
        table.unique(['user_id', 'role_id'])
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
    })
}
async down() {
    this.schema.dropTable(this.tableName)
}
```

- **Generate a many-to-many relationship between User and Role models:**

```tsx
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'

@column()
declare name: string
@column()
declare description: string

@belongsTo(() => User)
declare user: BelongsTo<typeof User>
```

- **Create seeders for adding roles and users:**

```bash
$ node ace make:seeder User
$ node ace make:seeder Role
```

- **Edit the RoleTableSeeder class:**

```tsx
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
    async run() {
        let role = new Role()
        role.name = 'admin'
        role.description = 'Administrador'
        await role.save()
        role = await new Role()
        role.name = 'user'
        role.description = 'Usuario'
        await role.save()
    }
}
```

- **Edit the UserTableSeeder class:**

```tsx
import User from '#models/user'
import Role from '#models/role'

const roleUser = await Role.findBy('name', 'user')
const roleAdmin = await Role.findBy('name', 'admin')
if (!roleUser || !roleAdmin) {
    throw new Error('Roles not found')
}
const users = [
    {
        email: 'admin@adonisjs.com',
        password: 'secret',
        role: roleAdmin,
    },
    {
        email: 'user@adonisjs.com',
        password: 'supersecret',
        role: roleUser,
    },
]
for (const userData of users) {
    const user = new User()
    user.email = userData.email
    user.password = userData.password
    await user.save()
    if (userData.role) {
        await user.related('roles').attach([userData.role.id])
    }
}
```

- **Run the migrations and seed the database:**

```bash
$ node ace migration:run
$ node ace db:seed
$ node ace migration:refresh --seed
```

## Running Tests

To run the tests, use the following command:

```bash
$ npm test
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome contributions that improve the project and help the community.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Additional Resources

For more information, please refer to the following documentation:

- [AdonisJS Installation Guide](https://docs.adonisjs.com/guides/getting-started/installation)
- [AdonisJS Relationships Documentation](https://lucid.adonisjs.com/docs/relationships)
- [AdonisJS Seeders Documentation](https://lucid.adonisjs.com/docs/seeders)
- [AdonisJS CRUD Operations](https://lucid.adonisjs.com/docs/crud-operations)
