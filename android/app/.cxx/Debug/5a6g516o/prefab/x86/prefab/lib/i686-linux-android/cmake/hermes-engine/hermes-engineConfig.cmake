if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/FPTSHOP/.gradle/caches/8.13/transforms/bb72a8786d445a14acf7b38e2f843300/transformed/hermes-android-0.79.3-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/FPTSHOP/.gradle/caches/8.13/transforms/bb72a8786d445a14acf7b38e2f843300/transformed/hermes-android-0.79.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

