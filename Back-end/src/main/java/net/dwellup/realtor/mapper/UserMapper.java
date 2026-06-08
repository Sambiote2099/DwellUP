package net.dwellup.realtor.mapper;

import net.dwellup.realtor.dto.UserDTO;
import net.dwellup.realtor.entity.User;

public class UserMapper {

    public static UserDTO toDto(User user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .userType(user.getUserType())
                .phoneNo(user.getPhoneNo())
                .doB(user.getDoB())
                .address(user.getAddress())
                .about(user.getAbout())
                .build();
    }

    public static User toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setUserType(userDTO.getUserType());
        user.setPhoneNo(userDTO.getPhoneNo());
        user.setDoB(userDTO.getDoB());
        user.setAddress(userDTO.getAddress());
        user.setAbout(userDTO.getAbout());
        return user;
    }
}
