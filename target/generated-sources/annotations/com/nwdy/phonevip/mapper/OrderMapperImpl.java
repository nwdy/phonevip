package com.nwdy.phonevip.mapper;

import com.nwdy.phonevip.dto.response.OrderDTO;
import com.nwdy.phonevip.model.Order;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-15T11:24:28+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public OrderDTO toOrderDTO(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderDTO orderDTO = new OrderDTO();

        orderDTO.setOrderCode( order.getOrderCode() );
        orderDTO.setTotalPrice( order.getTotalPrice() );

        return orderDTO;
    }
}
