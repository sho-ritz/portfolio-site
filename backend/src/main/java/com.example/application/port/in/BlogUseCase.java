package com.example.application.port.in;

import java.util.List;

import com.example.application.domain.model.Blog;

public interface BlogUseCase {
	List<Blog> getBlogs();
    /**
     * ブログ投稿を作成するユースケース
     *
     * @param title   ブログのタイトル
     * @param content ブログの本文
     * @return 作成された BlogPost オブジェクト
     */
    boolean createBlog(CreateBlogCommand command);

    /**
     * ブログ投稿を更新するユースケース
     *
     * @param id      更新対象のブログ投稿のID
     * @param title   新しいタイトル
     * @param content 新しい本文
     */
    boolean updateBlog(UpdateBlogCommand command);

    /**
     * ブログ投稿を削除するユースケース
     *
     * @param id 削除対象のブログ投稿のID
     */
    boolean deleteBlog(String id);
    
}