import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Colors, Scale } from '../theme';
import TextView from './textView';
import styles from './styles';

const Header = ({
    // Title Configuration
    title,
    showTitle = true,

    // Left Side Configuration
    leftIcon: LeftIconComponent,
    leftIconProps = {},
    onLeftPress,
    showLeftIcon = true,
    leftIconStyle,

    // Right Side Configuration (Array of icons)
    rightIcons = [], // Array of {icon: Component, props: {}, onPress: function, style: {}}
    showRightIcons = true,
    rightIconsContainerStyle,

    // Custom Right Content Configuration
    rightCustomContent, // Custom JSX content for right side
    rightCustomContentStyle,
    showCustomContent = false, // Flag to show custom content instead of icons

    // Header Styling
    backgroundColor = Colors.white,
    headerStyle,

    // Layout Options
    centerTitle = true,
    centerFlex = 2,
    rightFlex = 1,
}) => {
    // Render right side content
    const renderRightContent = () => {
        // If custom content is provided and flag is true, show custom content
        if (showCustomContent && rightCustomContent) {
            return (
                <View
                    style={[
                        styles.rightContainer,
                        { flex: rightFlex },
                        rightCustomContentStyle,
                    ]}
                >
                    {rightCustomContent}
                </View>
            );
        }

        // Default icons rendering
        if (!showRightIcons) {
            return (
                <View
                    style={[
                        styles.rightContainer,
                        { flex: rightFlex },
                        styles.hiddenContainer,
                    ]}
                />
            );
        }

        return (
            <View
                style={[
                    styles.rightContainer,
                    { flex: rightFlex },
                    rightIconsContainerStyle,
                ]}
            >
                {rightIcons.map((iconConfig, index) => {
                    const {
                        icon: IconComponent,
                        props = {},
                        onPress,
                        style,
                        disabled = false,
                    } = iconConfig;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.iconButton,
                                index > 0 && styles.rightIconSpacing,
                                style,
                                disabled && styles.disabledIcon,
                            ]}
                            onPress={onPress}
                            activeOpacity={disabled ? 1 : 0.7}
                            disabled={disabled}
                        >
                            <IconComponent {...props} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <View
            style={[
                styles.headerContainer,
                { backgroundColor },
                headerStyle,
            ]}
        >
            {/* Left Side */}
            <View
                style={[
                    styles.leftContainer,
                    !showLeftIcon && styles.hiddenContainer,
                ]}
            >
                {showLeftIcon && LeftIconComponent && (
                    <TouchableOpacity
                        style={[styles.iconButton, leftIconStyle]}
                        onPress={onLeftPress}
                        activeOpacity={0.7}
                    >
                        <LeftIconComponent {...leftIconProps} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Center - Title */}
            {showTitle && (
                <View
                    style={[
                        styles.centerContainer,
                        { flex: centerFlex },
                        !centerTitle && styles.leftAlignTitle,
                    ]}
                >
                    <TextView text={title} fontSize={Scale(24)} />
                </View>
            )}

            {/* Right Side - Icons or Custom Content */}
            {renderRightContent()}
        </View>
    );
};

export default Header;