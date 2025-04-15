package com.nwdy.phonevip.mapper;

import com.nwdy.phonevip.dto.request.ProductRequest;
import com.nwdy.phonevip.dto.response.ProductDetailResponse;
import com.nwdy.phonevip.dto.response.ProductResponse;
import com.nwdy.phonevip.model.Product;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-15T11:24:28+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toProduct(ProductRequest productRequest) {
        if ( productRequest == null ) {
            return null;
        }

        Product product = new Product();

        product.setName( productRequest.getName() );
        product.setPrice( productRequest.getPrice() );
        product.setDescription( productRequest.getDescription() );
        product.setImageUrl( productRequest.getImageUrl() );
        product.setStock( productRequest.getStock() );
        product.setManufacturer( productRequest.getManufacturer() );
        product.setRam( productRequest.getRam() );
        product.setStorage( productRequest.getStorage() );
        product.setColor( productRequest.getColor() );
        product.setRating( productRequest.getRating() );

        return product;
    }

    @Override
    public ProductResponse toProductResponse(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductResponse productResponse = new ProductResponse();

        productResponse.setId( product.getId() );
        productResponse.setName( product.getName() );
        productResponse.setPrice( product.getPrice() );
        productResponse.setDescription( product.getDescription() );
        productResponse.setImageUrl( product.getImageUrl() );
        productResponse.setStock( product.getStock() );
        productResponse.setManufacturer( product.getManufacturer() );
        productResponse.setRam( product.getRam() );
        productResponse.setStorage( product.getStorage() );
        productResponse.setColor( product.getColor() );
        productResponse.setRating( product.getRating() );

        return productResponse;
    }

    @Override
    public ProductDetailResponse toProductDetailResponse(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDetailResponse productDetailResponse = new ProductDetailResponse();

        productDetailResponse.setId( product.getId() );
        productDetailResponse.setName( product.getName() );
        productDetailResponse.setPrice( product.getPrice() );
        productDetailResponse.setDescription( product.getDescription() );
        productDetailResponse.setImageUrl( product.getImageUrl() );
        productDetailResponse.setStock( product.getStock() );
        productDetailResponse.setManufacturer( product.getManufacturer() );
        productDetailResponse.setRam( product.getRam() );
        productDetailResponse.setStorage( product.getStorage() );
        productDetailResponse.setColor( product.getColor() );
        productDetailResponse.setRating( product.getRating() );

        return productDetailResponse;
    }

    @Override
    public void updateProduct(Product product, ProductRequest productRequest) {
        if ( productRequest == null ) {
            return;
        }

        if ( productRequest.getName() != null ) {
            product.setName( productRequest.getName() );
        }
        if ( productRequest.getPrice() != null ) {
            product.setPrice( productRequest.getPrice() );
        }
        if ( productRequest.getDescription() != null ) {
            product.setDescription( productRequest.getDescription() );
        }
        if ( productRequest.getImageUrl() != null ) {
            product.setImageUrl( productRequest.getImageUrl() );
        }
        product.setStock( productRequest.getStock() );
        if ( productRequest.getManufacturer() != null ) {
            product.setManufacturer( productRequest.getManufacturer() );
        }
        product.setRam( productRequest.getRam() );
        product.setStorage( productRequest.getStorage() );
        if ( productRequest.getColor() != null ) {
            product.setColor( productRequest.getColor() );
        }
        product.setRating( productRequest.getRating() );
    }
}
