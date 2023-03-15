# 🚀 Astro MDX Code Blocks

Use a custom Astro component to render and syntax highlight code snippets in your MDX files.

## Demo

asdf

## Installation

Due to the extra configuration needed this integration needs to be manually installed.

> This integration depends on the [`AutoImport`](https://github.com/delucis/astro-auto-import) and [`mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) integrations.

```bash
npm install -D astro-mdx-code-blocks astro-auto-import mdx
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

## Code Block Component

### Props

The code block component you provide to the integration receives the following props.

| Prop | Type | Optional | Description |
| ---- | ---- | -------- | ------------|
| code | `String` | No | The raw contents of the fenced code block from the `.mdx` file.
| lang | `String` | Yes | The language detected from the fenced code block. |
| filename | `String` | Optional | If a `// filename.ts` is provided at the top of the code block it will be removed and sent in in the `filename` prop. |

In addition you can export the following type definition from the integration.

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

const showHeader = lang || filename;
---

<figure class="code-block">

    {showHeader && (
        <figcaption class="header">
            {title && (
                <span class="title">
                    {title}
                </span>
            )}
            {lang && (
                <span class="lang">
                    {lang}
                </span>
            )}
        </figcaption>
    )}

    {!!lang && (
        <div class="code-language">
            {lang}
        </div>
    )}

    <Prism
        code={code}
        lang={lang}
    />

</figure>
```

## Contributing

Issues and pull requests are welcome.

## License

[MIT](LICENSE)
