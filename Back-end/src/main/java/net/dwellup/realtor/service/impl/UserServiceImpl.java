package net.dwellup.realtor.service.impl;

import net.dwellup.realtor.dto.UserDTO;
import net.dwellup.realtor.entity.User;
import net.dwellup.realtor.mapper.UserMapper;
import net.dwellup.realtor.repository.UserRepository;
import net.dwellup.realtor.service.UserService;
import net.dwellup.realtor.util.PasswordHasher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserMapper.toEntity(userDTO);

        String hashedPassword = PasswordHasher.hashPassword(userDTO.getPassword());
        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserMapper::toDto)
                .toList();
    }

    @Override
    public UserDTO getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(UserMapper::toDto).orElse(null);
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        if (userRepository.existsById(userId)) {
            User existingUser = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            existingUser.setName(userDTO.getName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setPhoneNo(userDTO.getPhoneNo());
            existingUser.setAddress(userDTO.getAddress());
            existingUser.setDoB(userDTO.getDoB());
            existingUser.setUserType(userDTO.getUserType());
            existingUser.setAbout(userDTO.getAbout());

            User updatedUser = userRepository.save(existingUser);
            return UserMapper.toDto(updatedUser);
        }
        return null;
    }

    @Override
    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
