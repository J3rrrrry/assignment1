import React from 'react';
import { View, StyleSheet } from 'react-native';
import colours from '../helper/Colour';

/**
 * Card
 *
 * A reusable container component that wraps its children with a styled card layout.
 *
 * @param {React.ReactNode} children - The content to be wrapped inside the card.
 *
 * @returns {JSX.Element} The styled card component.
 */
const Card = ({ children }) => {
  return <View style={styles.cardContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colours.cardBackground,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: colours.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
