#!/bin/bash

# posts 폴더 경로
POSTS_DIR="./posts"
# public/images 폴더 경로
PUBLIC_IMAGES_DIR="./public/posts"

# posts 폴더 내의 각 블로그 타이틀 폴더를 순회
for blog_dir in "$POSTS_DIR"/*; do
  if [ -d "$blog_dir" ]; then
    # 블로그 타이틀 폴더 이름 추출
    blog_title=$(basename "$blog_dir")
    # 블로그 타이틀에 해당하는 public/posts 폴더 경로
    target_dir="$PUBLIC_IMAGES_DIR/$blog_title"

    # public/posts/블로그타이틀 폴더가 존재하지 않으면 생성
    mkdir -p "$target_dir"

    # 블로그 타이틀 폴더 내의 이미지 파일을 public/posts/블로그타이틀 폴더로 복사
    for image_file in "$blog_dir"/*.{png,jpg,jpeg,gif}; do
      if [ -f "$image_file" ]; then
        cp "$image_file" "$target_dir"
      fi
    done

    # Markdown 파일 내의 이미지 경로를 블로그타이틀/파일명.확장자 형식으로 변경
    for md_file in "$blog_dir"/*.md; do
      if [ -f "$md_file" ]; then
        echo "Processing $md_file"
        # 기존 경로 변경
        sed -i '' -e "s|!\[\([^]]*\)\](\./\([^)]*\))|![\1]($blog_title/\2)|g" "$md_file"
      fi
    done
  fi
done

echo "복사 & 변경 성공"