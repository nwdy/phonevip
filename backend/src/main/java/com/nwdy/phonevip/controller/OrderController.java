package com.nwdy.phonevip.controller;

import com.nwdy.phonevip.dto.response.ApiResponse;
import com.nwdy.phonevip.dto.response.OrderResponse;
import com.nwdy.phonevip.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/purchase")
    public ResponseEntity<ApiResponse<OrderResponse>> purchase() {
        return ResponseEntity.ok(ApiResponse.success(
                "Preparing order to purchase. ...",
                orderService.purchase()
        ));
    }

    // TODO: Fixing bug during process after payment
    // For TEST
//    @PostMapping("/createOrder")
//    public ResponseEntity<OrderDTO> createOrder(@RequestBody AddressRequest request) {
//        return ResponseEntity.ok(orderService.createOrder(request));
//    }
//
//    @GetMapping("/processAfterPayment")
//    public ResponseEntity<Void> processAfterPayment() {
//        orderService.processAfterPayment(4L);
//        return ResponseEntity.ok(null);
//    }

    // TODO: Implementing the features of getting history orders

}
