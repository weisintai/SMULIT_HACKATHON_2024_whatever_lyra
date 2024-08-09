import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor {
  type UserData = {
    // Define your user data structure here
    name : Text;
    email : Text;
    // Add more fields as needed
  };

  let userDataStore = HashMap.HashMap<Principal, UserData>(10, Principal.equal, Principal.hash);

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public shared ({ caller }) func whoami() : async Principal {
    return caller;
  };

  public shared (msg) func saveUserData(data : UserData) : async () {
    let userPrincipal = msg.caller;
    userDataStore.put(userPrincipal, data);
  };

  public shared (msg) func getUserData() : async ?UserData {
    let userPrincipal = msg.caller;
    userDataStore.get(userPrincipal);
  };
};
