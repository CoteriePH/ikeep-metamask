# iKeep
Secured, safe and encrypted account storage system.

## 🚀 Local Usage
Follow the steps below to get started:

1. Clone this repo and install dependencies
```bash
git clone https://github.com/CoteriePH/ikeep-metamask.git && cd iKeep && npm i
```

2. Make sure you have a worrking postgresql database.

3. Make sure you have the following `.env` variables set
    - `DATABASE_URL = postgres://<user>:<password>@localhost:<port>/database_name`
    - `IKEEP = lkajsdahs8das8d7asdjas6` - random string that is used to hash the seeds and decrypting_pin - the decrypting_pin is used to encrypt the accounts' username/email and password

4. Finally, start the application
```bash
npx prisma generate && npx prisma migrate dev && npm run dev
```

## 🧑‍💻 Contributing
These are the guidlines to follow when contributing to this project.
1. Fork or clone this repo
2. Make a new branch for your changes
3. When making a pull request, make sure to include a changelog and name the title accordinglly. see example below.
    - For features: Feature/<feature_name>
    - For bug fixes: Bugfix/<bug_name>
    - For refactoring: Refactor/<refactor_name>
    - For testing: Test/<test_name>
    - For documentation: Docs/<documentation_name>
    - For improvement: Improvement/<improvement_name>
4. Also further explain the changes in the comment