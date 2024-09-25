"use client";

import { useRef, useState } from "react";
import type { TextInput } from "react-native";
import { Search } from "@tamagui/lucide-icons";
import type { SizeTokens } from "tamagui";
import { useLink } from "solito/navigation";
import { Paragraph, View } from "tamagui";
import { Input } from "./inputParts";

/**
 * note: make sure to use the same width for the input and the container
 */

export function SearchBar({ size }: { size?: SizeTokens }) {
  const inputRef = useRef<TextInput>(null);
  const [input, setInput] = useState("");

  const linkProps = useLink({
    href: `/search/${input}`,
  });

  return (
    <View justifyContent="center" alignItems="center" f={1} $gtMd={{ f: 0 }}>
      <Input gapScale={0.7} size={size} minWidth="100%" w="100%">
        <Input.Box>
          <Input.Icon>
            <Search color="$color10" />
          </Input.Icon>
          <Input.Area
            ref={inputRef}
            paddingHorizontal={0}
            placeholder="Search news"
            onChangeText={(text) => setInput(text)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Enter") {
                input && linkProps.onPress?.();
              }
            }}
          />
          <Input.Section>
            <Input.Button
              px="$4"
              bg="$red10"
              br="$5"
              hoverStyle={{ scale: 1.05, bg: "$red11" }}
              pressStyle={{ scale: 0.95, bg: "$red10" }}
              {...(input && { ...linkProps })}>
              <Paragraph fow="bold" fos="$4" col="$color1">
                SEARCH
              </Paragraph>
            </Input.Button>
          </Input.Section>
        </Input.Box>
      </Input>
    </View>
  );
}
