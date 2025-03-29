package com.nwdy.phonevip.dto.request;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class CartItemUpdateRequest {
    @PositiveOrZero
    private int quantity;
    private boolean selected;
}
