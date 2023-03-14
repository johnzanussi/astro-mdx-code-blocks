import { visit, Visitor } from 'unist-util-visit';
import type { Code } from 'mdast';
import type { Transformer } from 'unified';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';

export type MetaAttributes = {
    [key: string]: string | boolean;
};

export type CodeBlocksOptions = {
    tagName: string;
};

export default function makeRemarkCodeBlocks({ tagName }: CodeBlocksOptions) {
    return function remarkCodeBlocks(): Transformer {
        return function transformer(tree): void {
            const visitor: Visitor<Code> = function (node, index, parent) {
                if (node.lang && parent && index !== null) {
                    const { lang, meta } = node;
                    try {
                        let metaAttributes: MetaAttributes = {};
                        if (meta) {
                            const metaMatches = Array.from(
                                meta.matchAll(/([^=\s]+)=['"]([^'"\s]+)/g)
                            );
                            metaAttributes = metaMatches.reduce(
                                (accum, match) => {
                                    const [_, key, value] = match;
                                    return {
                                        ...accum,
                                        [key]: value,
                                    };
                                },
                                {}
                            );
                        }
                        if (!metaAttributes.filename) {
                            node.value = node.value.replace(
                                /^\/\/\s?([^\n]+)\n/,
                                (_: string, filename: string) => {
                                    metaAttributes.filename = filename;
                                    return '';
                                }
                            );
                        }
                        const props = {
                            code: node.value,
                            lang,
                            ...metaAttributes,
                        };

                        const attributes: MdxJsxAttribute[] = Object.entries(
                            props
                        ).map(([name, value]) => ({
                            type: 'mdxJsxAttribute',
                            name,
                            value,
                        }));

                        const codeSnippetWrapper: MdxJsxFlowElement = {
                            type: 'mdxJsxFlowElement',
                            name: tagName,
                            attributes,
                            children: [],
                        };

                        parent.children.splice(index, 1, codeSnippetWrapper);
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.error(error);
                    }
                }
            };
            visit(tree, 'code', visitor);
        };
    };
}
