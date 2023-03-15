import type { AstroIntegration } from 'astro';
import makeRemarkCodeBlocks from './remarkCodeBlock.js';

export declare type CodeBlockProps = {
    code: string;
    lang?: string;
    filename?: string;
    foo: string;
};

const CodeBlockTagName = 'AutoImportedCodeBlock';

export const mdxCodeBlockAutoImport = (componentPath: string) => {
    // https://github.com/delucis/astro-auto-import/tree/main/packages/astro-auto-import#import-aliasing
    const codeBlockComponent: Record<string, [string, string][]> = {
        [componentPath]: [['default', CodeBlockTagName]],
    };

    return codeBlockComponent;
};

export default function MDXCodeBlocks(): AstroIntegration {
    return {
        name: 'astro-mdx-code-blocks',
        hooks: {
            'astro:config:setup': ({ updateConfig }) => {
                updateConfig({
                    markdown: {
                        remarkPlugins: [
                            makeRemarkCodeBlocks({
                                tagName: CodeBlockTagName,
                            }),
                        ],
                    },
                });
            },
        },
    };
}
