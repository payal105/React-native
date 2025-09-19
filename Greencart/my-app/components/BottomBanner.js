import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock assets data based on your structure
const assets = {
  bottom_banner_image: require('../assets/bottom_banner_image.png'), // Replace with your actual image path
  bottom_banner_image_sm: require('../assets/bottom_banner_image_sm.png'), // Replace with your actual image path
  delivery_icon: require('../assets/delivery_truck_icon.png'),
  leaf_icon: require('../assets/leaf_icon.png'),
  coin_icon: require('../assets/coin_icon.png'),
  trust_icon: require('../assets/trust_icon.png'),
};

const features = [
  {
    icon: assets.delivery_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes."
  },
  {
    icon: assets.leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source."
  },
  {
    icon: assets.coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices."
  },
  {
    icon: assets.trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers."
  }
];

const BottomBanner = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image 
        source={width > 768 ? assets.bottom_banner_image : assets.bottom_banner_image_sm}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Overlay Content */}
      <View style={styles.overlay}>
        <View style={[
          styles.contentContainer,
          width > 768 ? styles.contentDesktop : styles.contentMobile
        ]}>
          <Text style={styles.title}>Why We Are the Best?</Text>
          
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              {/* Feature Icon */}
              <View style={styles.iconContainer}>
                <Image 
                  source={feature.icon} 
                  style={styles.featureIcon}
                  resizeMode="contain"
                />
              </View>
              
              {/* Feature Text */}
              <View style={styles.textContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
          
          {/* Fast Delivery Badge */}
          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryBadgeText}>🚚 Fast Delivery</Text>
            <Text style={styles.deliveryTime}>in 30 Min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 96, // equivalent to mt-24 (24 * 4px)
    height: height * 0.6,
    minHeight: 800,
    marginBottom: 304,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',

  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 154,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  contentDesktop: {
    alignItems: 'flex-end',
    marginRight: 96, // equivalent to md:pr-24
    marginTop: 0,
  },
  contentMobile: {
    alignItems: 'center',
    paddingTop: 64, // equivalent to pt-16
  },
  title: {
    fontSize: width > 768 ? 28 : 24, // text-2xl md:text-3xl
    fontWeight: '600', // font-semibold
    color: '#059669', // text-primary (emerald-600)
    marginBottom: 24,
    textAlign: width > 768 ? 'right' : 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: width > 768 ? 44 : 36, // md:w-11 w-9
    height: width > 768 ? 44 : 36,
    backgroundColor: '#10B981', // emerald-500
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIcon: {
    width: width > 768 ? 24 : 20,
    height: width > 768 ? 24 : 20,
  },
  textContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: width > 768 ? 20 : 18, // text-lg md:text-xl
    fontWeight: '600', // font-semibold
    color: '#374151', // gray-700
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: width > 768 ? 14 : 12, // text-xs md:text-sm
    color: 'rgba(107, 114, 128, 0.7)', // text-gray-500/70
    lineHeight: width > 768 ? 18 : 16,
  },
  deliveryBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deliveryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6', // blue-500
    marginRight: 8,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#6B7280', // gray-500
  },
});

export default BottomBanner;