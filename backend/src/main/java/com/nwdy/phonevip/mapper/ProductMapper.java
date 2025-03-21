package com.nwdy.phonevip.mapper;

import com.nwdy.phonevip.dto.request.ProductRequest;
import com.nwdy.phonevip.dto.response.ProductResponse;
import com.nwdy.phonevip.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    Product toProduct(ProductRequest productRequest);
    ProductResponse toProductResponse(Product product);
    @Mapping(target = "id", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductRequest productRequest);
}
