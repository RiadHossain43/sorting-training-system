# Sorting Training System

This project is hosted on Vercel.  
**Demo:** [Sorting Training System](https://sorting-training-system-red.vercel.app/)

## Directory Structure

```sh
.
├── README.md
├── index.html
├── package.json
├── public/
│   └── logo.svg
├── src/
│   ├── app.vue
│   ├── assets/icons.svg
│   ├── components/ui/
│   │   ├── badge.vue
│   │   ├── button.vue
│   │   ├── checkbox.vue
│   │   ├── icon.vue
│   │   ├── input.vue
│   │   └── modal.vue
│   ├── lib/unique-number-generator.ts
│   ├── main.ts
│   ├── modules/sorting-department/
│   │   ├── composables/
│   │   │   ├── tests/
│   │   │   │   ├── useModals.test.ts
│   │   │   │   ├── useTableData.test.ts
│   │   │   │   └── useTimer.test.ts
│   │   │   ├── useModals.ts
│   │   │   ├── useTableData.ts
│   │   │   └── useTimer.ts
│   │   ├── index.vue
│   │   ├── table.vue
│   │   ├── tests/
│   │   │   ├── generate-rows.test.ts
│   │   │   ├── helpers.ts
│   │   │   ├── sort-rows.test.ts
│   │   │   ├── sorting-system.test.ts
│   │   │   └── timer.test.ts
│   │   └── timer.vue
│   ├── styles/
│   │   ├── app.scss
│   │   ├── components.scss
│   │   ├── layout.scss
│   │   ├── typography.scss
│   │   └── variables.scss
│   ├── types/
│   │   ├── index.ts
│   │   ├── table.ts
│   │   └── timer-config.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```

## Development

To start the development server, run:

```sh
yarn dev
```

## Testing

I've structured the tests close to the actual feature modules, keeping them relevant and easy to manage. My focus has been on behavioral tests—how the features work rather than unit-testing every small piece. For example, atomic UI components aren't tested separately, as in a real-world project, they'd usually come from a UI kit.

To run all tests, just use:

```sh
yarn test
```

## Additional Notes

I could have incorporated more established libraries and UI kits to enhance consistency and production readiness, but chose to keep the implementation simple. This allows me to demonstrate a clear understanding of frontend technologies while maintaining flexibility in the project.
