package com.nwdy.phonevip.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String name;
    private String username;
    private String password;
    private String email;
}
