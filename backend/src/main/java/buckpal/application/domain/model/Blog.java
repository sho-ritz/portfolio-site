package buckpal.application.domain.model;

import java.time.LocalDateTime;

public class Blog {
    private final BlogId id;
    private String title;
    private String content;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // コンストラクタで必須項目を初期化
    public Blog(BlogId id, String title, String content) {
        if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("タイトルは必須です。");
        }
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("本文は必須です。");
        }
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    // タイトルの更新（業務ルールを含む場合）
    public void updateTitle(String newTitle) {
        if (newTitle == null || newTitle.isEmpty()) {
            throw new IllegalArgumentException("Title is needed.");
        }
        this.title = newTitle;
        this.updatedAt = LocalDateTime.now();
    }

    // 本文の更新
    public void updateContent(String newContent) {
        if (newContent == null || newContent.isEmpty()) {
            throw new IllegalArgumentException("Content is needed.");
        }
        this.content = newContent;
        this.updatedAt = LocalDateTime.now();
    }

    // ゲッター
    public BlogId getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}