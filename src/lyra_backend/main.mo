import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor {
  type UserData = {
    consentToDataCollection : Int;
  };

  let userDataStore = HashMap.HashMap<Principal, UserData>(10, Principal.equal, Principal.hash);

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public shared ({ caller }) func whoami() : async Principal {
    return caller;
  };

  public shared ({ caller }) func getUserData() : async ?UserData {
    userDataStore.get(caller);
  };

  public shared ({ caller }) func createUser(consentToDataCollection : Int) : async () {
    userDataStore.put(
      caller,
      {
        consentToDataCollection;
      },
    );
  };

};
