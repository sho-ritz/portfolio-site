package com.example.adapter.out;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class CloudinaryConfig {

    private final Cloudinary cloudinary;

    public CloudinaryConfig(
            @Value("${cloud.key}") String key,
            @Value("${cloud.secret}") String secret,
            @Value("${cloud.name}") String cloud) {
        this.cloudinary = new Cloudinary(Map.of(
                "cloud_name", cloud,
                "api_key", key,
                "api_secret", secret
        ));
    }

    public Map upload(Object file, Map options) {
        try {
            return cloudinary.uploader().upload(file, options);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String createUrl(String name, int width, int height, String action) {
        return cloudinary.url()
                .transformation(new Transformation()
                        .width(width)
                        .height(height)
                        .border("2px_solid_black")
                        .crop(action))
                .imageTag(name);
    }
}
