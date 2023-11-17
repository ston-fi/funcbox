# Changelog

## [0.0.11] - 2023-11-17

### Added

- Add `interfaces` lib: helper for `jetton` and `any` messages with builder support
- Add `HOLE_ADDRESS` constant
- Add new `msgs` lib helpers that accept builder, prefixed by `msgs::send_b*`
- Add new math functions

### Changed

- Refactor `math` lib into two separate libs

## [0.0.10] - 2023-11-02

### Added

- Add new `math` functions: `pow`, `ln`, `exp` and `log` 
- Add new `address` functions: `check_workchain` and `check_hashpart`
- Add SBT NFT missing opcodes
- Add additional wrapper for unsupported opcodes

## [0.0.9] - 2023-10-12

### Added

- Add `time` library (constants helpers and utilities)
- Add constants values for max uint
- Add status load/store functions
- Add reserves library

## [0.0.8] - 2023-08-08

### Added

- Add `begin_message` util 

### Fixed

- Fix tests not throwing on errors

## [0.0.7] - 2023-07-20

### Added

- Add `op::excesses` opcode
- Add `load_query_id & store_query_id` helpers functions
- Add `load_opcode & store_opcode` helpers functions
- Add dict helper library
- Add `address.is_none()` helper
- Add `cell.is_empty()` helper
- Add dump utils library
- Add `utils.number_to_slice`
- Add math library
- Add cell utils library
- Add test util `assert` library
- Add tests

### Changed

- Rename library `address_utils` to `address`

## [0.0.6] - 2023-06-23

### Added

- Add `load_time & store_time` helpers functions (alias `load_uint(64) & store_uint(64)`)
- Add `load_uint* & store_uint*` helpers functions to work with fixed uints (8, 16, 32, 64, 128, 256)
- Add quiete messages send modes (prefixed with `Q`)
- Add `equal_cell` function

## [0.0.5] - 2023-06-19

### Fixed

- Add missing skip bits on bounced calls

## [0.0.4] - 2023-05-31

### Added

- Add `address_utils` library
- Add standard opcodes (NFTs & FTs)
- Add `as_slice` helper function

### Removed

- Remove `address` library

## [0.0.3] - 2023-05-30

### Changed

- Cosmetic changes
- Rename `contex` lib to `ctx`

## [0.0.2] - 2023-05-29

### Added

- Add `address` library

## [0.0.1] - 2023-05-26

### Added

- Add initial library release

[0.0.11]: https://github.com/ston-fi/funcbox/tree/v0.0.11
[0.0.10]: https://github.com/ston-fi/funcbox/tree/v0.0.10
[0.0.9]: https://github.com/ston-fi/funcbox/tree/v0.0.9
[0.0.8]: https://github.com/ston-fi/funcbox/tree/v0.0.8
[0.0.7]: https://github.com/ston-fi/funcbox/tree/v0.0.7
[0.0.6]: https://github.com/ston-fi/funcbox/tree/v0.0.6
[0.0.5]: https://github.com/ston-fi/funcbox/tree/v0.0.5
[0.0.4]: https://github.com/ston-fi/funcbox/tree/v0.0.4
[0.0.3]: https://github.com/ston-fi/funcbox/tree/v0.0.3
[0.0.2]: https://github.com/ston-fi/funcbox/tree/v0.0.2
[0.0.1]: https://github.com/ston-fi/funcbox/tree/v0.0.1