package buckpal.application.domain.model;

public class BlogId {
    private final String value;

    public BlogId(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("IDは必須です。");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BlogId)) return false;
        BlogId that = (BlogId) o;
        return value.equals(that.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }

    @Override
    public String toString() {
        return value;
    }
}
