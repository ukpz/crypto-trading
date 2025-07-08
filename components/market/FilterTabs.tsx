import { Text, TouchableOpacity, View } from "react-native";

const tabs = ['all', 'gainer', 'loser', 'favourites'];

const FilterTabs = ({ selected, onSelect }:{selected:any,onSelect:any}) => (
  <View className="flex-row mb-2">
    {tabs.map(tab => (
      <TouchableOpacity
        key={tab}
        onPress={() => onSelect(tab)}
        className={`px-3 py-1 mr-2 rounded-full ${selected === tab ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <Text className={`${selected === tab ? 'text-white' : 'text-black'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default FilterTabs
