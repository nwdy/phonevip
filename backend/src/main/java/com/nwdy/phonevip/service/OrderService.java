package com.nwdy.phonevip.service;

import com.nwdy.phonevip.dto.SelectedOrderItemDTO;
import com.nwdy.phonevip.dto.request.AddressRequest;
import com.nwdy.phonevip.dto.response.OrderDTO;
import com.nwdy.phonevip.dto.response.OrderItemDTO;
import com.nwdy.phonevip.dto.response.OrderResponse;
import com.nwdy.phonevip.exception.AppException;
import com.nwdy.phonevip.exception.ErrorCode;
import com.nwdy.phonevip.mapper.OrderMapper;
import com.nwdy.phonevip.model.*;
import com.nwdy.phonevip.model.enums.PaymentStatus;
import com.nwdy.phonevip.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final CartItemRepository cartItemRepository;

    private final OrderItemRepository orderItemRepository;

    private final ProductRepository productRepository;

    private BigDecimal totalPrice;

    public OrderResponse purchase() {
        List<OrderItemDTO> orderItemDTOList = cartItemRepository.findOrderItemDTOsByUsername(getCurrentUsername());
        User user = userRepository.findByUsername(getCurrentUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        OrderResponse orderResponse = new OrderResponse(orderItemDTOList, user.getPhoneNumber(), user.getAddress());
        totalPrice = orderResponse.getTotalPrice();
        return orderResponse;
    }

    public OrderDTO createOrder(AddressRequest request) {
        Order order = new Order();
        User user = userRepository.findByUsername(getCurrentUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        userRepository.save(user);

        // TODO: Using UUID for orderId
        order.setId(16L);
        order.setUser(user);
        order.setTotalPrice(totalPrice);
        System.out.println("total price = " + totalPrice);
        order.setPaymentStatus(PaymentStatus.PENDING);
        orderRepository.save(order);
        log.info("Order created {}, id {}, total price {}", order, order.getId(), order.getTotalPrice());
        return OrderMapper.INSTANCE.toOrderDTO(order);
    }

    public void processAfterPayment(Long orderId) {
        System.out.println("Processing after payment: orderId = " + orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        System.out.println("Getting cart items for saving order");
        List<SelectedOrderItemDTO> selectedItems = cartItemRepository
                .findSelectedOrderItemDTOsByUsername(order.getUser().getUsername());

        if (selectedItems.isEmpty()) {
            log.warn("Order {} has no cart items", orderId);
        }

        for (SelectedOrderItemDTO item : selectedItems) {
            System.out.println("Processing item: " + item);
            // Save order item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItemRepository.save(orderItem);
            log.info("Saved order item {}", orderItem);

            // Update product stock
            Product product = item.getProduct();
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
            log.info("Updated product stock quantity: id {}, stock quantity {}", product.getId(), product.getStock());
        }

        // Remove paid/selected cart items
        System.out.println("Deleting cart items from cart");
        List<Long> cartItemIds = selectedItems.stream().map(SelectedOrderItemDTO::getCartItemId).toList();
        if (!cartItemIds.isEmpty()) {
            cartItemRepository.deleteByIdIn(cartItemIds);
            System.out.println("Deleted " + cartItemIds.size() + " cart items for order " + orderId);
        } else {
            System.out.println("No cart items found");
        }

    }

    public boolean orderExists(Long orderId) {
        return orderRepository.existsById(orderId);
    }

    public String getAmount() {
        return String.valueOf(BigDecimal.valueOf(100).multiply(totalPrice).longValue());
    }

    public PaymentStatus getPaymentStatus(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return order.getPaymentStatus();
    }

    public void updatePaymentStatus(Long orderId, PaymentStatus paymentStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setPaymentStatus(paymentStatus);
    }

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
