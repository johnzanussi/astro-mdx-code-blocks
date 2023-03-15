# 🚀 Astro MDX Code Blocks

Use a custom Astro component to render and syntax highlight code snippets in your MDX files.

## Demo

View a demo of the integration in action on [StackBlitz](https://stackblitz.com/edit/astro-mdx-code-blocks-example?file=src%2Fpages%2Findex.mdx,astro.config.mjs,src%2Fcomponents%2FCodeBlock.astro).

## Installation

Due to the extra configuration needed, you must manually install this integration.

> This integration depends on the [`AutoImport`](https://github.com/delucis/astro-auto-import) and [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) integrations.

```bash
npm install -D astro-mdx-code-blocks astro-auto-import @astrojs/mdx
```


## Code Block Component

Create a component in your project that will be used to render fenced code blocks.

### Props

The code block component provided to the integration receives the following props.

| Prop | Type | Optional | Description |
| ---- | ---- | -------- | ------------|
| code | `String` | No | The raw contents of the fenced code block from the `.mdx` file.
| lang | `String` | Yes | The language detected from the fenced code block. |
| filename | `String` | Optional | If a `// filename.ts` is provided at the top of the code block it will be removed and sent in in the `filename` prop. |

In addition, you can export the following type definition from the integration.

```ts
type CodeBlockProps = {
    code: string;
    lang?: string;
    filename?: string;
};
```

```ts
import type { CodeBlockProps } from 'astro-mdx-code-blocks';
```


### Example Component

```astro
// src/components/CodeBlock.astro
---
import { Prism } from '@astrojs/prism';

const {
    code,
    lang,
    filename,
} = Astro.props;

const hasLang = !!lang;
const hasFileName = !!filename;

const showHeader = hasLang || hasFileName;
---

<figure class="code-block">

    {showHeader && (
        <figcaption class="header">
            {hasFileName && (
                <span class="filename">
                    {filename}
                </span>
            )}
            {hasLang && (
                <span class="lang">
                    {lang}
                </span>
            )}
        </figcaption>
    )}

    <Prism
        code={code}
        lang={lang}
    />

</figure>
```

## Configuration

* Import the `AutoImport` and `mdx` integrations.
* Import `MDXCodeBlocks` and `mdxCodeBlockAutoImport` from `astro-mdx-code-blocks`.
* Add `AutoImport`, `MDXCodeBlocks`, and `mdx` to the `integrations` config option.
* Use the `mdxCodeBlockAutoImport` function to provide the `AutoImport` integration the path to your custom Astro component.

```js
import { defineConfig } from 'astro/config';

import AutoImport from 'astro-auto-import';
import mdx from '@astrojs/mdx';

import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';

export default defineConfig({
    // ...
    integrations: [
         AutoImport({
            imports: [
                mdxCodeBlockAutoImport('src/components/CodeBlock.astro')
            ],
        }),
        MDXCodeBlocks(),
        mdx(),
    ],
});
```

> AutoImport must come before `MDXCodeBlocks` and `MDXCodeBlocks` must come before `mdx`.

## Usage

Use [fenced code blocks](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks) in your MDX files as you normally would. As noted above, the integration will pull out certain metadata from the block and provide it to your custom Astro component.

## Contributing

Issues and pull requests are welcome.

## License

[MIT](LICENSE)
