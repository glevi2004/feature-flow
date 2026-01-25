# Contributing to Feature Ship

Thank you for your interest in contributing to Feature Ship! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/feature-flow.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Set up environment variables (see `.env.example`)
6. Run the development server: `npm run dev`

## Development Workflow

1. **Create an issue** (if one doesn't exist) describing the bug or feature
2. **Fork and branch** from `main`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Commit** with clear, descriptive messages
7. **Push** to your fork
8. **Open a Pull Request** with a clear description

## Coding Standards

- **TypeScript**: Use TypeScript for all new code
- **Linting**: Run `npm run lint` before committing
- **Formatting**: Follow the existing code style
- **Naming**: Use descriptive names for variables, functions, and components
- **Comments**: Add comments for complex logic
- **Error Handling**: Always handle errors appropriately

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add rate limiting to API routes`

## Pull Request Process

1. Ensure your code passes linting and type checking
2. Update documentation for any new features
3. Add tests if applicable
4. Ensure all CI checks pass
5. Request review from maintainers
6. Address any feedback

## Testing

- Write tests for new features and bug fixes
- Ensure existing tests pass
- Test edge cases and error conditions

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🎉
