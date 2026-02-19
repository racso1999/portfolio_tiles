import random


def input_generator():
    while True:
        number_of_zones = input("How many zones would you like to generate?\n>")
        try:
            number_of_zones = int(number_of_zones)
            break
        except ValueError:
            print('Error - please input a valid integer')
            continue

    while True:
        number_of_bins = input("how many bins would you like to generate?\n>")
        try:
            number_of_bins = int(number_of_bins)
            break
        except ValueError:
            print('Error - please input a valid integer')
            continue

    bin_input = []
    max_time = number_of_bins * 13

    for i in range(1, number_of_bins + 1):
        a = random.randint(0, max_time - 20)
        bin_input.append({"id": "wb" + str(i), "zone": random.randint(1, number_of_zones),
                          "type": random.choice(["general", "recycling"]),
                          "volume": random.randint(1, 3), "a": a,
                          "b": a + 20})

    road_network = []
    for i in range(number_of_zones + 1):
        for j in range(number_of_zones + 1):
            if i != j:
                road_network.append((i, j, random.randint(1, 10)))

    return bin_input, road_network


class Bin:
    def __init__(self, id: int, type: str, zone: int, volume: int, a: int, b: int):
        self.id = id
        self.type = type
        self.zone = zone
        self.volume = volume
        self.a = a
        self.b = b

    def set_weight(self, weight):
        self.weight = weight


class linked_list_node:
    def __init__(self, bin_data: object, next_node: object = None):
        self.bin_data = bin_data  # stores bin info
        self.next_node = next_node


class linked_list:
    def __init__(self, head=None):
        self.head = head

    def length(self):
        count = 0
        current = self.head
        while current is not None:
            count += 1
            current = current.next_node
        return count

    def pop_front(self):
        if self.head is None:
            return None
        popped_bin = self.head.bin_data
        self.head = self.head.next_node
        return popped_bin

    def sort_by_weight(self, bin_data: object):
        node = linked_list_node(bin_data)  # if list is empty
        if self.head is None or bin_data.weight < self.head.bin_data.weight:
            node.next_node = self.head
            self.head = node
            return

        current_node = self.head  # insert by weight ascending
        while current_node.next_node is not None:
            if bin_data.weight < current_node.next_node.bin_data.weight:
                node.next_node = current_node.next_node
                current_node.next_node = node
                return
            current_node = current_node.next_node

        node.next_node = current_node.next_node
        current_node.next_node = node

    def print_list(self):
        if self.head is None:
            print("List Empty")
            return

        current_node = self.head
        while current_node.next_node is not None:
            print(f"Bin {current_node.bin_data.id}  -->", end=" ", flush=True)
            current_node = current_node.next_node
        print(f"Bin {current_node.bin_data.id}")


def run():
    # GENERATE INPUTS
    bin_input, road_network = input_generator()
    # INITIALISE STATES
    waiting_time = 0
    truck_num_bins = 0
    truck_volume = 0
    time_elapsed = 0
    late_bins = 0
    current_zone = 0
    bin_objects = [Bin(**b) for b in bin_input]
    ordered_by_weight = linked_list()
    max_volume = 10
    max_num_bins = 5
    general_bins = 0
    recycling_bins = 0

    print(
        f"Truck Status: Zone {current_zone}, Volume: {truck_volume}/{max_volume}, Bins: {truck_num_bins}/{max_num_bins}")
    print(f"t={time_elapsed}\n")

    # initial pass: use bin_objects
    for b in bin_objects:
        travel_time = 0
        for e in road_network:
            if e[0] == current_zone and e[1] == b.zone:
                travel_time = e[2]
                break

        b.weight = travel_time + b.b
        ordered_by_weight.sort_by_weight(b)

    # further passes: use ordered_by_weight
    while ordered_by_weight.length() > 0:
        if truck_volume + ordered_by_weight.head.bin_data.volume <= max_volume and truck_num_bins + 1 <= max_num_bins:  # TRUCK FULL?
            ordered_by_weight.print_list()

            next_bin = ordered_by_weight.pop_front()  # POP_FRONT()

            if current_zone == next_bin.zone:
                print(f"Already in zone {next_bin.zone}")
            else:
                for e in road_network:
                    if e[0] == current_zone and e[1] == next_bin.zone:
                        time_elapsed += e[2]
                        print(f"move zone {current_zone} -> {next_bin.zone} (t+{e[2]})")
                        break

            # WINDOW OPEN?
            if time_elapsed >= next_bin.a:
                time_elapsed += 1
                print(f"Picked bin {next_bin.id} (t+1)")
                if time_elapsed > next_bin.b:
                    late_bins += 1
                    print("LATE")
            else:  # WAITING
                print(f"WAITING (t+{next_bin.a - time_elapsed})")
                waiting_time += (next_bin.a - time_elapsed)
                time_elapsed = next_bin.a
                time_elapsed += 1
                print(f"Picked bin {next_bin.id} (t+1)")
                if time_elapsed > next_bin.b:
                    late_bins += 1
                    print("LATE")

            # UPDATE(truck_status)
            current_zone = next_bin.zone
            truck_volume += next_bin.volume
            truck_num_bins += 1

            print(
                f"Truck Status: Zone {current_zone}, Volume: {truck_volume}/{max_volume}, Bins: {truck_num_bins}/{max_num_bins}")
            print(f"t={time_elapsed}\n")

            # RECALCULATE WEIGHTS/ RESORT()
            if ordered_by_weight.length() > 0:
                temp_list = linked_list()  # Temporary list for re-sorting
                while ordered_by_weight.length() > 0:
                    b = ordered_by_weight.pop_front()

                    if current_zone == b.zone:
                        travel_time = 0
                    else:
                        travel_time = 0
                        for e in road_network:
                            if e[0] == current_zone and e[1] == b.zone:
                                travel_time = e[2]
                                break

                    b.weight = travel_time + b.b
                    temp_list.sort_by_weight(b)

                ordered_by_weight = temp_list  # refactor

        # RETURN TO DEPOT
        else:
            print("RETURNING TO DEPOT")

            for e in road_network:
                if e[0] == current_zone and e[1] == 0:
                    time_elapsed += e[2]
                    print(f"move {current_zone} -> depot (t+{e[2]})")
                    break

            print("unloading (t+6)")

            truck_volume = 0
            truck_num_bins = 0
            current_zone = 0
            time_elapsed += 6

            print(f"Truck Status: Zone Depot, Volume: {truck_volume}, Bins: {truck_num_bins}")
            print(f"t={time_elapsed}\n")

            # RECALCULATE WEIGHTS/ RESORT()
            if ordered_by_weight.length() > 0:
                temp_list = linked_list()  # Temporary list for re-sorting
                while ordered_by_weight.length() > 0:
                    b = ordered_by_weight.pop_front()

                    if current_zone == b.zone:
                        travel_time = 0
                    else:
                        travel_time = 0
                        for e in road_network:
                            if e[0] == current_zone and e[1] == b.zone:
                                travel_time = e[2]
                                break

                    b.weight = travel_time + b.b
                    temp_list.sort_by_weight(b)

                ordered_by_weight = temp_list  # refactor

    # RETURN TO DEPOT
    if current_zone != 0:
        print("All Bins Picked Up")
        for e in road_network:
            if e[0] == current_zone and e[1] == 0:
                time_elapsed += e[2]
                print(f"move zone {current_zone} -> depot (t+{e[2]})")
                break

        print("unloading (t+6)")
        time_elapsed += 6

    print(f"t={time_elapsed}")
    print(f"late={late_bins}/{len(bin_input)}")
    print(f"waiting={waiting_time}")

    for bin in bin_input:
        if bin["type"] == "recycling":
            recycling_bins += 1
        else:
            general_bins += 1
    print(f"recycling={recycling_bins}/{len(bin_input)}")
    print(f"general={general_bins}/{len(bin_input)}")


if __name__ == "__main__":
    run()