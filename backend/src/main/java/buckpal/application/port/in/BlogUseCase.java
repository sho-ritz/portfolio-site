package buckpal.application.port.in;

import java.util.Optional;

public interface BlogUseCase {
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
    boolean updateBlog(String id, Optional<String> title, Optional<String> content);

    /**
     * ブログ投稿を削除するユースケース
     *
     * @param id 削除対象のブログ投稿のID
     */
    boolean deleteBlog(String id);
    
}