const vscode = require('vscode');

var SharedCompletion = [];
var SharedHover = [];
var SharedSignature = [];
var Constants = [];
var aDOT = [];

class APIparser {
    constructor(docs) {
        for (const element of docs.functions) {
            Get(element, vscode.CompletionItemKind.Function)
        }
        for (const element of docs.classes) {
            Get(element, vscode.CompletionItemKind.Class);
            var temp = {
                static: element.definition.static,
                name: element.definition.name,
                Completion: [],
                Hover: [],
                SignatureInformation: []
            }
            for (const element2 of element.methods) {
                var head = GetHead(element2, vscode.CompletionItemKind.Function);
                var documentation = GetDocumentation(element2, vscode.CompletionItemKind.Function);
                var Completion = GetCompletion(element2.name, head, documentation, vscode.CompletionItemKind.Function)
                var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
                Hover.name = element.definition.name + "." + element2.name;
                var signatureInformation = new vscode.SignatureInformation(head, new vscode.MarkdownString(element.definition.description))
                signatureInformation.name = element.definition.name + "." + element2.name;
                signatureInformation.parameters = GetParameterInformation(element2)
                temp.Completion.push(Completion);
                temp.Hover.push(Hover);
                temp.SignatureInformation.push(signatureInformation);
                if (element.definition.static) {
                    ToSIDE(undefined, Hover, signatureInformation)
                }
            }
            for (const element2 of element.properties) {
                var head = GetHead(element2, vscode.CompletionItemKind.Property);
                var documentation = GetDocumentation(element2, vscode.CompletionItemKind.Property);
                var Completion = GetCompletion(element2.name, head, documentation, vscode.CompletionItemKind.Property)
                var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
                Hover.name = element.definition.name + "." + element2.name;
                temp.Completion.push(Completion);
                temp.Hover.push(Hover);
                if (element.definition.static) {
                    ToSIDE(undefined, Hover, undefined)
                }
            }
            aDOT.push(temp)
        }
        GetEvent(docs);
        GetConstants(docs);
        return docs;
    }
}

function Get(element, kind) {
    var name;
    var description;
    if (kind == vscode.CompletionItemKind.Function) {
        name = element.name;
        description = element.description
    }
    else if (kind == vscode.CompletionItemKind.Class) {
        name = element.definition.name;
        description = element.definition.description
    }
    var head = GetHead(element, kind);
    var documentation = GetDocumentation(element, kind);
    var Completion = GetCompletion(name, head, documentation, kind)
    var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
    Hover.name = name;
    var signatureInformation = new vscode.SignatureInformation(head, new vscode.MarkdownString(description))
    signatureInformation.name = name;
    if (kind == vscode.CompletionItemKind.Class) {
        if (element.constructors.length != 0) {
            signatureInformation.parameters = GetParameterInformation(element.constructors[0])
        }
    }
    else {
        signatureInformation.parameters = GetParameterInformation(element)
    }
    ToSIDE(Completion, Hover, signatureInformation)
}

function GetExtends(element) {
    let s = ""
    if (element.definition.extends != null) {
        s = " extends " + /\[(\w+)\]/.exec(element.definition.extends)[1];
    }
    return s;
}

function GetParameterInformation(element) {
    let tab = [];
    for (const element2 of element.params) {
        let temp = new vscode.ParameterInformation(element2.name, element2.description)
        temp.type = element2.type;
        tab.push(temp);

    }
    return tab;
}

function ToSIDE(Completion, Hover, signatureInformation) {
        if (Completion != undefined)
            SharedCompletion.push(Completion)
        if (Hover != undefined)
            SharedHover.push(Hover)
        if (signatureInformation != undefined)
            SharedSignature.push(signatureInformation)
}

function GetEvent(docs) {
    for (const element of docs.events) {
        var head = GetHead(element, vscode.CompletionItemKind.Event);
        var documentation = GetDocumentation(element, vscode.CompletionItemKind.Event);
        var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
        Hover.name = element.name;
        SharedHover.push(Hover)
    }
}

function GetConstants(docs) {
    for (const element of docs.constants) {
        var obj = {
            category: element.category,
            completion: [],
            hover: [],
        };
        for (const element2 of element.elements) {
            obj.completion.push(GetCompletion(element2.name, element2.name, element2.description, vscode.CompletionItemKind.Constant));
            var hover = new vscode.Hover("``` typescript\n" + element2.name + "\n```\n" + element2.description);
            hover.name = element2.name
            obj.hover.push(hover);
        }
        Constants.push(obj)
    }
}

function GetCompletion(name, head, documentation = null, kind = vscode.CompletionItemKind.Keyword) {
    var Completion = new vscode.CompletionItem(name, kind);
    Completion.documentation = new vscode.MarkdownString("``` typescript\n" + head + "\n```\n" + documentation);
    Completion.documentation.supportHtml = true;
    return Completion;
}

function GetHead(obj, kind) {
    var code = "";
    var params = "";
    if (kind == vscode.CompletionItemKind.Function) {
        code += "function " + obj.name;
        params = obj;
    }
    else if (kind == vscode.CompletionItemKind.Class) {
        if (obj.definition.static)
            code += "static "
        code += "class " + obj.definition.name;
        params = obj.constructors[0];
    }
    else if (kind == vscode.CompletionItemKind.Property) {
        code += "properties " + obj.name;
        code += GetReturnsHead(obj.returns);
        return code;
    }
    else if (kind == vscode.CompletionItemKind.Event) {
        code += "event " + obj.name;
        params = obj;
    }
    code += GetHeadParams(params);
    if (kind == vscode.CompletionItemKind.Class) {
        code += GetExtends(obj);
    }
    return code;
}

function GetHeadParams(obj) {
    var code = "(";
    if (obj == undefined) {
        code += "): void";// only class without params
        return code;
    }
    if (obj.params.length != 0) {
        for (var i = 0; i < obj.params.length; i++) {
            code += obj.params[i].name;
            if (obj.params[i].default != null)
                code += "? = " + obj.params[i].default;
            code += ": " + obj.params[i].type;
            if (i < obj.params.length - 1)
                code += ", ";
        }
    }
    code += ")";
    code += GetReturnsHead(obj.returns);
    return code;
}

function GetReturnsHead(returns) {
    if (returns != null) {
        return ": " + returns.type;
    }
    else {
        return ": void";
    }
}

function GetDocumentation(obj, kind) {
    var definition = "";
    var constructors = "";
    var documentation = "";
    if (kind == vscode.CompletionItemKind.Function) {
        definition = obj;
        constructors = obj;
    }
    else if (kind == vscode.CompletionItemKind.Class) {
        definition = obj.definition;
        constructors = obj.constructors[0];
    }
    else if (kind == vscode.CompletionItemKind.Property) {
        definition = obj;
        constructors = obj;
        documentation += GetDeprected(definition) + "\n\n";
        documentation += definition.description + "\n\n";
        documentation += GetNotes(definition);
        return documentation;
    }
    else if (kind == vscode.CompletionItemKind.Event) {
        definition = obj;
        constructors = obj;
        documentation += GetDeprected(definition) + "\n\n";
        documentation += definition.description + "\n\n";
        documentation += GetNotes(definition);
        return documentation;
    }
    documentation += GetDeprected(definition) + "\n\n";
    documentation += definition.description + "\n\n";
    documentation += GetNotes(definition);
    documentation += GetDocumentationParams(constructors);
    documentation += GetReturnsDocumentation(definition.returns)
    return documentation;
}

function GetDeprected(element) {
    let s = ""
    if (element.deprecated != null)
        s = "***Deprecated since version: " + element.deprecated + "***"
    return s;
}

function GetNotes(definition) {
    var temp = "";
    if (definition.notes != null) {
        for (const element of definition.notes) {
            temp += element + "\n\n"
        }
    }
    return temp;
}

function GetDocumentationParams(obj) {
    var documentation = "";
    if (obj != null) {
        if (obj.params.length != 0) {
            for (const element of obj.params) {
                documentation += "@param " + "`" + element.name + "` " + element.description + "\n\n";
            }
        }
    }
    return documentation;
}

function GetReturnsDocumentation(returns) {
    if (returns != null) {
        return "@return " + returns.description + "\n\n";
    }
    return "";
}

module.exports = {
    APIparser, Constants, aDOT, SharedCompletion, SharedHover, SharedSignature,
}