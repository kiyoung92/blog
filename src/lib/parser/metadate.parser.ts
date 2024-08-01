import yaml from 'js-yaml';

interface MarkdownData {
  markdownData: string;
}

interface MarkdownMetadate {
  metadata: string;
}

export function extractMetadata({ markdownData }: MarkdownData): string | null {
  const match = markdownData.match(/---\s*([\s\S]*?)\s*---/);
  return match ? match[1].trim() : null;
}

export function parseMetadataToJson({
  metadata,
}: MarkdownMetadate): Record<string, string> | null {
  try {
    return yaml.load(metadata) as Record<string, string>;
  } catch (e) {
    return null;
  }
}

export function extractFirstImagePath({
  markdownData,
}: MarkdownData): string | null {
  const match = markdownData.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
}
